export const googleMapCSS = {
    reportSection: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
    },
    reportSectionLg: {
        height: "inherit"
    },
    mapContainer: {
        display: "grid",
        gridTemplateColumns: "1fr 2fr 1fr"
    },
    mapContainerLg: {
        display: "grid",
        gridTemplateColumns: "1fr"
    },
    googleMap: {
        display: "flex",
        width: "68rem",
        height: "600px",
        border: "10px groove blue",
        boxShadow: "0 0 4px 2px black",
        borderRadius: "15px",
        position: "relative"
    },
    googleMapSearch: {
        position: "absolute",
        content: "",
        top: "10px",
        left: "40%",
        padding: "5px 20px",
        fontSize: "1.3rem",
        border: "1px solid black",
        boxShadow: "0 0 2px 2px black",
        zIndex: "2"
    },
    reportContainer: {
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignItems: "center",
        gap: "30px"
    },
    speechContainer: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    speechContainerLg: {
        display: "flex",
        justifyContent: "space-between"
    }
}