// Задание: Собрать все value из дерева

const tree = {
    value:1,
    children:[{
        value:2,
        children:[{
            value:3,
            children:[{value:4}]
        }]
    },{
        value:5,
        children:[{value:6},{value:7}]
    }]
}

const getTreeValues = (tree) => {
    const result = [];
    const treeKeys = Object.keys(tree)
    for(let key of treeKeys) {
        if(key === "value"){
            result.push(tree[key])
            continue;
        }
        if(key === 'children'){
            const nested = tree[key].map(v=>getTreeValues(v))
            result.push(nested)
        }
    }
    return result.flat(Infinity)
}

console.log(getTreeValues(tree))

const getTreeValues2 = (tree) => {
    const stack = [tree]
    const result = [];
    while (stack.length) {
        const node = stack.pop()
        if(node.value){
            result.push(node.value)
        }
        if(node.children){
            stack.push(...node.children)
        }
    }
    return result
}

console.log(getTreeValues2(tree))