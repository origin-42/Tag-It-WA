export const ModalCSS = {
    modalSection: {
        position: "relative",
        display: "flex",
        justifyContent: "center",
    },
    flexStack: {
        display: "flex",
        gap: "10px",
        cursor: "pointer"
    },
    flexStackSpace: {
        display: "flex",
        justifyContent: "space-between",
        gap: "10px",
    },
    modal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        content: "",
        width: "100%",
        height: "100vh",
        backgroundColor: "black",
        opacity: ".9",
        zIndex: "2"
    },
    innerModal: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "10px",
        padding: "10px 40px",
        width: "100%",
        backgroundColor: "white",
        opacity: "1",
        zIndex: "3"
    },
    modalSpan: {
        fontWeight: "bold"
    },
    toolTip: {
        fontStyle: "italic",
        opacity: "0.8"
    },
    modalSections: {
        display: "flex",
        flexDirection: "column",
        gap: "10px"
    },
    modalInput: {
        padding: "3px 5px",
        margin: "0 5px",
        backgroundColor: "inherit"
    },
    cross: {
        cursor: "pointer"
    }
}