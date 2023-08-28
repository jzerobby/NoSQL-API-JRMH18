const dayjs = require('dayjs');

module.exports = (date) => {
    const dateFormat = dayjs(date).format("DD MMM YYYY")

    return dateFormat
}