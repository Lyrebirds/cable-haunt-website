export interface modem {
    model: string;
    firmwareVersion: string;
    port: string;
    defaultUser: string;
}

export interface userReportedModem {
    model: string;
    firmwareVersion: string;
    port: string;
    defaultUser: string;
    isp: string;
}