export const Comments = ({ tagInfo }) => {
    const seeComments = () => {
        localStorage.setItem("commentedTag", tagInfo._id)
        window.location.replace('/commentInfo');
    }

    return (
        <article key={"comment-" + tagInfo._id} id={"comment-" + tagInfo._id}>
            <div>
                <div>
                    <h4>{tagInfo.criteria}</h4>
                    <h4>{tagInfo.date}</h4>
                    <button onClick={seeComments}>See More</button>
                </div>
            </div>
        </article>
    )
}