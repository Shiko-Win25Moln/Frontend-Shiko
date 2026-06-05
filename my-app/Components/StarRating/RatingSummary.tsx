import Summary from "./Summary";

async function getRatingSummary () {
    const response = await fetch(
        "https://localhost:4443/reviews/summary",
        {cache: "no-store"}
    )

    return response.json();
};

export default async function ReviewSummary() {
    const summary = await getRatingSummary();

    return(
        <Summary
            averageRating={summary.averageRating}
            reviewCount={summary.reviewCount}
        />
    )
}
