import recursive from "recursive-readdir"
import ignore from "ignore"
import fetch from "node-fetch";
import fs from "fs"

const path = "/home/berliangur/eleven6/yak-aggregator";

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

const gitignorePath = `${path}/.gitignore`
let gitignoreLines = [];
try {
    const gitignoreContent = fs.readFileSync(gitignorePath, 'utf8')
    gitignoreLines.push(...gitignoreContent.split('\n'))
} catch (e) {}

gitignoreLines.push('LICENSE');
gitignoreLines.push('*lib*');

gitignoreLines.push('*.json');
gitignoreLines.push('.git');
gitignoreLines.push('*.png');
gitignoreLines.push('*.jpg');
gitignoreLines.push('*.jpeg');
gitignoreLines.push('*.ico');
gitignoreLines.push('*.woff');
gitignoreLines.push('*.woff2');
gitignoreLines.push('*.ttf');
gitignoreLines.push('*.wrm');
gitignoreLines.push('*.map');
gitignoreLines.push('*.svg');
gitignoreLines.push('*.ai');
gitignoreLines.push('.yarn');
gitignoreLines.push('.vs');
gitignoreLines.push('.next');
gitignoreLines.push('yarn.lock');
gitignoreLines.push('pnpm-lock.yaml');
gitignoreLines.push('node_modules');

const maxSymbols = 100000;

const ig = ignore().add(gitignoreLines)

const l = console.log;

const url = "http://localhost:8080/dev/second"

function proceed() {
    return new Promise(resolve => {
        recursive(path, function (err, ffirst) {
            //console.log('first ', ffirst.length);
            const fthird = ffirst.map((f) => f.substr(1))
            //console.log('third ', fthird.length);
            const fsecond = ig.filter(fthird);
            //console.log('second ', fsecond.length);
            const ps = [];
            for (const ffourth of fsecond) {
                const ffifth = fs.readFileSync(`/${ffourth}`, 'utf8');
                //console.log('ffifth ', ffifth.length);
                const psecond = new Promise(resolve => {
                    const title = ffourth;
                    const content = ffifth;
                    if (content.length > maxSymbols) {
                        //console.log("maxSymbols ", title);
                        return resolve(null);
                    } else {
                        fetch(`${url}/?.title=${encodeURIComponent(title)}`, {
                            method: "GET"
                        }).then(rfirst => rfirst.json()).then((rsecond) => {
                            const lfirst = rsecond.results.length;
                            //console.log("lfirst ", lfirst);
                            if (lfirst > 0) {
                                resolve(null);
                            } else {
                                resolve({
                                    title,
                                    content,
                                })
                            }
                        });
                    }
                });
                const pthird = psecond.then((rthird) => {
                    if (rthird) {
                        const {title, content} = rthird;
                        l("title ", title);
                        const pfourth = fetch(url, {
                            method: "POST",
                            body: JSON.stringify({
                                title,
                                content,
                            })
                        }).then((r) => r.json())
                        return pfourth;
                    } else {
                        return null;
                    }
                });
                ps.push(pthird);
            }
            //console.log("ps ", ps.length);
            Promise.all(ps).then((fsixth) => {
                console.log("fsixth ", fsixth.length)
                const fseventh = fsixth.filter(f => !!f)
                console.log("fseventh ", fseventh.length)
                resolve();
            }).catch(console.error)
        })
    })
}

async function main() {
    while (true) {
        await proceed();
        await sleep(11500);
    }
}

main();