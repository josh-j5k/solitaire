export default function resetZIndex() {
    const dragoverZone = document.querySelectorAll(".dragover_zone")
    dragoverZone.forEach((zone) => {
        zone.classList.remove("show")
    })
}