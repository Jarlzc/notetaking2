
//Read json file
let rawdata = fs.readFileSync('userlog.json');
let userlog = JSON.parse(rawdata);
let notes = userlog;
const date = require("../util/date");

function render () {
    let day = date.getDate();
    res.render('list', {
        ListTitle: day,
        itemsarray: notes
    });
}