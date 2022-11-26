const refresh28 = async () => {
    ea.reset();
    ea.style.fontFamily = 3;

    const elements = ea.getViewElements();

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

    const l = console.log;

    try {
        l("elements ", elements.length);
        const dps = [];
        for (const el of elements) {
            try {
                if (!el.text) {
                    continue;
                }
                const isTitle = el.text.startsWith('home/');
                if (isTitle) {
                    const title = el.text;
                    if (!title.contains('db.js')) {
                        continue;
                    }
                    l("title ", title.split('/').pop());
                    const file = await fetch(`${url}/?.title=${encodeURIComponent(title)}`).then(r => r.json()).then(r => r.results[0])
                    if (!file) {
                        l("no file ", title.split('/').pop());
                        continue;
                    }
                    const fileId = file.id;
                    l("fileId ", fileId.length);
                    const fileContent = file.content;
                    l("fileContent ", fileContent.length);
                    if (fileContent) {
                        const contentEl = findContentElement(el);
                        if (!contentEl) {
                            l("no contentEl ", el.id);
                            continue;
                        }
                        l("contentEl ", contentEl.text.length);
                        if (contentEl && contentEl.text != fileContent) {
                            console.log(fileContent);

                            ea.copyViewElementsToEAforEditing([contentEl]);
                            ea.elementsDict[contentEl.id].text = fileContent;
                            ea.addElementsToView(true, true);

                            dps.push(fetch(`${url}/${file.id}`, { method: "DELETE" }))
                        }
                    }
                }
            } catch (e) {
                l("error ", e.toString().substring(-20));
            }
        }
        Promise.all(dps).then((results) => console.log("results ", results.length))
    } catch (err) {
        new Notice(err.toString().substr(0, 42));
    }

    new Notice('Done!');
}