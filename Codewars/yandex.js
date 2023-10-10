{
    /**
     * https://leetcode.com/problems/k-diff-pairs-in-an-array/description/
     * Дан массив интов и число K, K >= 0
     * Нужно найти количество пар элементов, разница которых == K
     *
     * [3,1,4,1,5],2 => (1, 3) и (3, 5).
     * [1,2,3,4,5],1 => (1, 2), (2, 3), (3, 4) и (4, 5).
     * [1,3,1,5,4],0 => 1 (1, 1)
     */
    const findPairs = function (nums, k) {
        const map = {};
        let count = 0;
        for(let i = 0; i < nums.length; i++){
            map[nums[i]] = (map[nums[i]] ?? 0) + 1
        }
        Object.keys(map).forEach(num => {
            if(k !== 0){
                const nextValue = Number(num) + Number(k)
                if(map[nextValue] !== undefined){
                    count++
                }
            } else {
                if(map[num]>= 2) count++
            }

        })
        return count;
    };
    findPairs([1,3,1,5,4],0)
}
