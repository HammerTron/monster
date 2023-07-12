// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function isArrayCheck(response: any): any {
    return Array.isArray(response) ? response[0] : response;
}
