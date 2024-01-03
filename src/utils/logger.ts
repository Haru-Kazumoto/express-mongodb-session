import dayjs from "dayjs";
import logger from "pino";

const log = logger({
    timestamp: () => `,"time":"${dayjs().format()}"`
});

export default log;