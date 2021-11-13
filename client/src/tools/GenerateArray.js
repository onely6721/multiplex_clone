function * range ( start, end, step ) {
    let state = start;
    while ( state < end ) {
        yield state;
        state += step;
    }
    return;
};

const generateArray = (start,end,step) => Array.from( range(start,end,step) );

export default generateArray