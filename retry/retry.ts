const { createHash } = require('crypto');
const { v4: uuidv4 } = require('uuid');
import Logger from './logger';

enum status { Idle, Scheduled, Retrying, Completed, Failed, Stopped };

interface RetryRefs {
    promise: Promise<any>,
    timeout: NodeJS.Timeout,
    context: RetryContext,
}

interface RetryContext {
    (resolve : (toResolve : any) => void, reject: (toReject : any) => void, $this : Retry) : void;
}

/**
 * @class Retry
 */
export class Retry {
    created : number;
    maxAttempts : number;
    readonly uuid : string;

    private _attempts : number;
    private _status : status;
    private logger : any;
    private refs : RetryRefs;

    protected millisecondsFromNow : number;
    protected millisecondsFromNowString: string;
    /**
     * description
     * @param context {RetryContext}
     */
    constructor(context : RetryContext) {
        // millisecondsFromNow : when the Retry is set to run next (milliseconds)
        this.millisecondsFromNow = undefined;

        // scheduledDate : when the Retry is set to run next (ISO)
        this.millisecondsFromNowString = undefined;

        // created : when the Retry was first created
        this.created = Date.now();

        // maxAttempts : max attempts allowed for the Retry
        this.maxAttempts = undefined;

        /* * read-only (unsafe to modify) * */

        // uuid : uuid for the Retry
        this.uuid = uuidv4();

        // attempts : number of attempts that the Retry has made
        this._attempts = 0;

        // status : the Retry's current status
        this._status = 0;

        // logger : Logger for this retry
        this.logger = new Logger();
        this.logger.set.name("Retry");
        this.logger.set.prefix(`${this.checksum()}`);

        // refs : important references for the Retry
        this.refs = {
            // promise : the promise that's returned from the Retry
            promise: undefined,
            // timeout: the setTimeout used to schedule the Retry
            timeout: undefined,
            // context : the function for Retry to call
            context: context,
        }
    }


    /**
     * @function status (getter)
     * @getter
     * returns the status as a String
     * @returns string
     */
    get status() {
        switch (this._status) {
            case status.Idle:
                return "idle";
            case status.Scheduled:
                return "scheduled";
            case status.Retrying:
                return "retrying";
            case status.Completed:
                return "completed";
            case status.Failed:
                return "failed";
        }
    }


    /**
     * @function status (setter)
     * @setter
     * updates this.status based on a status.Something
     * @param newVal {status}
     */
    set status(newVal : any) {
        this._status = newVal;
    }

    get attempts() {
        return this._attempts;
    }

    /**
     * @function checksum
     * returns the MD5 computed checksum for a given Retry
     * @private
     * @returns string
     */
    private checksum() : string {
        const uid = `${ this.created }:${ this.uuid }`;
        return createHash("md5")
            .update(uid)
            .digest("hex");
    }

    /**
     * @function schedule
     * schedules the Retry to trigger for the `context` based on the `time`
     * @param time {number} : time to schedule the Retry (milliseconds)
     * @returns Promise<any>
     */
    public async schedule(
        time : number = 0,
    ) : Promise<any> {
        if (this._status === status.Retrying || this._status === status.Scheduled) {
            this.logger.log("already retrying -> returning watcher promise");
            return this.refs.promise;
        }

        this.millisecondsFromNow = time;
        this.millisecondsFromNowString = new Date(Date.now() + time).toUTCString();

        this.refs.promise = new Promise((resolve, reject) => {
            this.refs.timeout = setTimeout(async () => {
                this._status = status.Retrying;
                if (this._attempts) this.logger.log(`retrying...attempt #${ this._attempts }`);
                const wrapResolve = (toResolve) => {
                    this.status = status.Completed;
                    this._attempts++;
                    resolve(toResolve);
                }
                const wrapReject = (toReject) => {
                    this.status = status.Failed;
                    this._attempts++;
                    reject(toReject);
                }
                this.refs.context(wrapResolve, wrapReject, this);
            }, time);
        });

        this.status = status.Scheduled;
        return this.refs.promise;
    }


    /**
     * @function reschedule
     * clears any pending timeouts and runs schedule() for the new time
     * @param newTime {number} : new time to schedule the Retry (milliseconds)
     * @returns Promise<any>
     */
    public async reschedule(newTime : number) : Promise<any>{
        if (this._attempts) this.logger.log(`rescheduled for ${ this.millisecondsFromNowString }`);
        this.stop();
        return this.schedule(newTime);
    }

    /**
     * @function stop
     * stops the scheduled Retry
     */
    public stop() : void {
        if (this.status !== status.Retrying) {
            clearTimeout(this.refs.timeout);
            this.status = status.Stopped;
        }
    }
}