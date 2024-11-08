// Rating and review reducer code start ------------------------
export const initStateOfRatingAndReviewReducer = {
    loading: false,
    error: false,
    publicationList: [],
    hopperList: [],
    totalPublication: 0,
    totalHopper: 0,
    publicationLimit: 10,
    hopperLimit: 10,
    ratingAndReviewList: [],
    activeDivId: "",
    activeTab: 0
}

export const ratingAndReviewReducer = (state, { type, payload, total, activeDivId, activeTab }) => {
    switch (type) {
        // Publication listing-
        case "PublicationPending":
            return { ...state, loading: false };

        case "PublicationResolve":
            return { ...state, loading: false, publicationList: payload, totalPublication: total };

        case "PublicationError":
            return { ...state, loading: false, error: true };


        // Hopper listing-
        case "HopperPending":
            return { ...state, loading: false };

        case "HopperResolve":
            return { ...state, loading: false, hopperList: payload, totalHopper: total };

        case "HopperError":
            return { ...state, loading: false, error: true };


        // Rating and review of publication-
        case "R&RPending":
            return { ...state, loading: false };

        case "R&RResolve":
            return { ...state, loading: false, ratingAndReviewList: payload};

        case "R&RError":
            return { ...state, loading: false, error: true };


        // Active div-
        case "ActiveDiv":
            return { ...state, activeDivId };

        
        // Active div-
        case "ActiveTab":
            return { ...state, activeTab };


        // Default state-
        default:
            return state
    }
}

// Rating and review reducer code end ------------------------