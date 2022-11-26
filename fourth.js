const ea = ExcalidrawAutomate;
const fn3 = () => {
    const sort1 = (a, b) => {
        if (a.y > b.y) {
           `` return 1;
        } else {
            if (a.x > b.x) {
                return 1;
            } else {
                return -1;
            }
        }
    }
    const text1 = 'home/berliangur';
    const els1 = ea.getViewSelectedElements()
    const els2 = els1.filter(el => el.text.contains(text1))
    const els3 = els1.filter(el => !el.text.contains(text1))
    els2.sort(sort1);``
    els3.sort(sort1);
    els2.shift();
    const el1 = els3.shift();
    const el2 = els3[els3.length - 1];
    const x1 = el1.x, y1 = el1.y;
    const x2 = el2.x, y2 = el2.y;
    let x3 = el1.x + el1.width, y3 = el1.y;
    let y4 = el1.height;
    let idx = 0;
    for (const ela of els3) {
        const elb = els2[idx];
        ela.x = x3;
        ela.y = y3;
        if (ela.x > x2) {
            x3 = el1.x;
            y3 += y4;
            ela.x = x3;
            ela.y = y3;
            y4 = 0;
        } else { 
            x3 += ela.width;
            if (ela.height > y4) {
                y4 = ela.height;
            }
        }
        elb.x = ela.x;
        elb.y = ela.y - 25;
        idx++;
    }
    ea.addElementsToView();
}
fn3();