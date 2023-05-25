/**
 * Необходимо найти элементы, которые имеют наибольшую последовательность
 * [1,3,4,8,9,10] => [8,9,10]
 */

{
    const arr = [1,3,4,8,9,10]

    const longSequence = (iterable) => {
        const result = [];
        let sequence = 0;
        for(let i = 0; i < iterable.length; i++){
            if(!Array.isArray(result[sequence])) result[sequence] = [];
            const current = iterable[i];
            const next = iterable[i + 1];
            if(current + 1 === next){
                result[sequence].push(current)
            } else {
                result[sequence].push(current)
                sequence++
            }
        }
        return [...result].sort((a,b)=>b.length - a.length)[0]
    }

    longSequence(arr)
}