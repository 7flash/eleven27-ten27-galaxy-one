const url = "http://localhost:8080/dev/third";

const findTitleElement = (title) => {
    const elements = ea.getViewElements();
    for (const el of elements) {
        if (el.text == title) {
            return el;
        }
    }
    return null;
}

const elements = ea.getViewElements();
const findContentElement = (titleElement) => {
    const groupId = titleElement.groupIds.pop();
    for (const el of elements) {
        if (el.groupIds.pop() == groupId && el.id != titleElement.id) {
            return el;
        }
    }
    return null;
}

const refresh27c = async () => {
    ea.reset();
    ea.style.fontFamily = 3;

    const findTitleElement = (title) => {
        for (const el of elements) {
            if (el.text == title) {
                return el;
            }
        }
        return null;
    }

    const findContentElement = (titleElement) => {
        const groupId = titleElement.groupIds.pop();
        for (const el of elements) {
            if (el.groupIds.pop() == groupId && el.id != titleElement.id) {
                return el;
            }
        }
        return null;
    }

    new Notice('Refreshing..');

    let prevX = 0;
    let prevY = 0;

    const url = "http://localhost:8080/dev/second"

    const marginX = 20;
    const marginY = 20;

    try {
        const files = await fetch(url).then(r => r.json()).then(r => r.results);
        console.log("files ", files.length);

        for (const file of files) {
            const title = file["title"];
            const content = file["content"];
            if (content.length > 100000) {
                return fetch(`${url}/${file.id}`, { method: "DELETE" }).then(console.log).catch(console.error);
            }
            const titleElement = findTitleElement(title);
            if (titleElement) {
                const contentElement = findContentElement(titleElement);
                if (!contentElement) throw 'content element not found';
                const newContentElementId = ea.addText(contentElement.x, contentElement.y, content);
                const newTitleElementId = ea.addText(titleElement.x, titleElement.y, title);
                ea.deleteViewElements([contentElement,titleElement]);
                ea.addToGroup([newContentElementId, newTitleElementId]);
            } else {
                const newTitleElementId = ea.addText(prevX,prevY,title);
                const newContentElementId = ea.addText(prevX, prevY+marginY, content);
                ea.addToGroup([newTitleElementId, newContentElementId]);
                const nte = ea.getElement(newTitleElementId);
                const nce = ea.getElement(newContentElementId);
                const groupWidth = nte.width > nce.width ? nte.width : nce.width;
                prevX += groupWidth + marginX;
            }

            fetch(`${url}/${file.id}`, { method: "DELETE" }).then(console.log).catch(console.error)
        }

        ea.addElementsToView(true, true);
    } catch (err) {
        new Notice(err.toString().substr(0, 42));
    }

    new Notice('Done!');
}

const save27 = (gEls) => {

    const titleElement = gEls.filter(el => el.text.startsWith('home')).pop();

    {title, content, anchorId, relativeX, relativeY}


}