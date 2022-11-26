const find = (text) => {
    const newEls = [];
    const els = api.getSceneElements().filter(el => el.type == 'text');

    for (const el of els) {
        if (el.text && el.text.length > 0) {        
            const existing = el.text.indexOf(text) >= 0;
    
            if (existing) {
                const newEl = buildText("!!!", el.x, el.y);
                //newEl.fontSize = el.fontSize;
                newEls.push(newEl);
            }
        }
    }

    console.log({newEls})

    api.updateScene({
        elements: [
            ...api.getSceneElements(),
            ...newEls
        ]
    })
}