export type PostProps = {
    id: number;
    threadID?: number;
    text: string;
    userName: string;
    created_at: Date;
    name: string | undefined;
    colorCode?: string;
    linkToThread: boolean;
    threadTitle?: string;
    ticker_list?: string[];
    sentiment_list?: string[];
    deletePress: (ID: number) => void;
};