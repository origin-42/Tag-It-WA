export const PanTo = ({initialCoords, setMarker}) => {

    const panView = () => {
        setMarker(initialCoords);
    }

    return (
        <button
        onClick={panView}
        >Re-center</button>
    )
}