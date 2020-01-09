import { FetchContext, Swork } from "swork";
import { Middleware, RequestDelegate } from "swork/dist/swork";

export function when(predicate: (context: FetchContext) => Promise<boolean> | boolean, app: Swork): Middleware {
    
    // tslint:disable-next-line:no-string-literal
    const whenApp = app["build"]() as RequestDelegate;

    return async (context: FetchContext, next: () => Promise<void>) => {
        if (await predicate(context)) {
            await whenApp(context);
        } else {
            await next();
        }
    };
}
