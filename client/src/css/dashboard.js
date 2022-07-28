/* Dashboard Container */
export const DashboardCSS = {
    dashboard: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        gap: "40px"
    },
    dashboardContainer: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        gap: "30px"
    },
    optionsContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
        gap: "10px",
        width: "100%",
    },
    optionsBox: {
        display: "flex",
        flexDirection: "column",
        flexBasis: "25%",
        gap: "10px",
        border: "1px solid black",
        padding: "1rem",
        backgroundColor: "#61baff",
        cursor: "pointer",
        boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
        borderRadius: "3px",
        color: "black",
        textShadow: "2px 7px 5px rgba(0,0,0,0.3), 0px -4px 10px rgba(255,255,255,0.3)",
        minWidth: "300px"
    },
    centerHeader: {
        textAlign: "center",
        fontSize: "1.7rem"
    },
    centerHeaderLrg: {
        textAlign: "center",
        fontSize: "2rem"
    },

}

// Tags, Alerts, Comments
export const DashboardMods = {
    UnderLine: {
        borderBottom: "2px solid blue",
        borderTop: "2px solid blue"
    },
    All: {
        color: "#00334d"
    },
    Tags: {
        Container: {
            display: "flex",
            flexDirection: "column",
            gap: "8px"
        }
    },
    Comments: {
        Container: {
            display: "flex",
            flexDirection: "column",
            gap: "8px"
        }
    },
    Alerts: {
        Container: {
            display: "flex",
            flexDirection: "column",
            gap: "8px"
        }
    }
}