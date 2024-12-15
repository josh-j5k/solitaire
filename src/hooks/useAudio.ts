export default function audio() {
    const successAudio = new Audio("/src/assets/audio/success_H3LxEVI6.m4a")
    const dealCard = new Audio("/src/assets/audio/Reveal Card.m4a")
    const dragStartSound = new Audio(
        "/src/assets/audio/Solitaire Card Game SFX - Page 2_2.m4a"
    )
    const dragEndSound = new Audio(
        "/src/assets/audio/Solitaire Card Game SFX - Page 2_3.m4a"
    )
    const dropSound = new Audio(
        "/src/assets/audio/Solitaire Card Game SFX - Page 2_4.m4a"
    )
    const clickSound = new Audio(
        "/src/assets/audio/click-for-game-menu-131903.mp3"
    )
    const reDeal = new Audio(
        "/src/assets/audio/Solitaire Card Game SFX - Page 2_5.m4a"
    )
    const winningSound = new Audio(
        "/src/assets/audio/positive-notification-new-level-152480.mp3"
    )
    const shuffleSound = new Audio(
        "/src/assets/audio/Solitaire Card shuffle SFX - Page 2.m4a"
    )

    return { dealCard, dragEndSound, dragStartSound, dropSound, clickSound, reDeal, winningSound, successAudio, shuffleSound }
}