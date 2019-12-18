export class TransformService {
    static fbObjectToArray(fbData) {
        return Object.keys(fbData).map(key => {
            const item = fbData[key];
            //console.log(item);
            item.id = key;
            item.title = fbData[key].title;
            return item;
        })
    }
}