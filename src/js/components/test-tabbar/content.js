import React, {useState} from 'react';

const ListContent = () => {
    const [count1, setCount1] = useState(0);
    const [count, setCount] = useState(0);
    return (
        <>
            <div className="tabcontent" id="listReport_content" >
                <h3>London</h3>
                <p>London is the capital city of England.</p>
                <p>You clicked {count1} times</p>
                <button onClick={() => setCount1(count1 + 1)}>
                    Click me
                </button>
            </div>
            <div className="tabcontent" id="attachment_content" >
                <p>You clicked {count} times</p>
                <button onClick={() => setCount(count + 1)}>
                    Click me
                </button>
            </div>
        </>
    )
}

export default ListContent;