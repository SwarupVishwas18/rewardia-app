function MissionList({ missions, setActiveMission }) {
    return (
        <section className="missions">
            <h1 className="subtitle">Missions</h1>
            <div className="mission-list">
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
                <div className="mission-link"><a href="">Mission</a></div>
            </div>
            <div className="btns-main">
                <button>Add Mission</button>
            </div>
        </section>
    )
}

export default MissionList;