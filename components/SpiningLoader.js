import { ClockLoader } from "react-spinners"

export default function SpinningLoader() {
    return (
        <>
            <ClockLoader size={40} color="#4287f5" loading="true" speedMultiplier={1} />
        </>
    )
}