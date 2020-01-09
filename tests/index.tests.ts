import { FetchContext, Swork } from "swork";
import { RequestDelegate } from "swork/dist/swork";
import { when } from "./../src/index";
import { getFetchEvent, mockInit } from "./mock-helper";

declare var global: any;

function build(instance: Swork): RequestDelegate {
    // tslint:disable-next-line:no-string-literal
    return instance["build"]();
}

describe("when tests", () => {
    let instance: Swork;
    let whenInstance: Swork;
    let context: FetchContext;

    beforeEach(() => {
        mockInit();

        instance = new Swork();
        whenInstance = new Swork();

        context = new FetchContext(getFetchEvent("http://www.example.com"));
    });

    test("when goes into provided app when true", async (done) => {
        let whenAppCalled = false;
        let mainAppStopped = true;
        
        whenInstance.use(() => {
            whenAppCalled = true;
        });

        instance.use(when((_: FetchContext) => true, whenInstance));

        instance.use(() => {
            mainAppStopped = false;
        });

        const delegate = build(instance);

        await delegate(context);

        expect(whenAppCalled).toBeTruthy();
        expect(mainAppStopped).toBeTruthy();

        done();
    });

    test("when does not go into app when false", async (done) => {
        let whenAppCalled = false;
        let mainAppStopped = true;

        whenInstance.use(() => {
            whenAppCalled = true;
        });

        instance.use(when((_: FetchContext) => false, whenInstance));

        instance.use(() => {
            mainAppStopped = false;
        });

        const delegate = build(instance);

        await delegate(context);

        expect(whenAppCalled).toBeFalsy();        
        expect(mainAppStopped).toBeFalsy();

        done();
    });

    test("when passes a valid FetchContext to the predicate", async (done) => {
        let passedContext: FetchContext | null = null;

        instance.use(when((c: FetchContext) => {
            passedContext = c; 
            return true;
        }, whenInstance));

        const delegate = build(instance);

        await delegate(context);

        expect(passedContext).toBe(context);

        done();
    });
});
