export default function Background(){
    return (
        <div className="fixed inset-0 bg-[#020617] -z-10 overflow-hidden pointer-events-none">
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 2px, transparent 0),
                                          linear-gradient(to right, #1e293b 1.5px, transparent 1px),
                                          linear-gradient(to bottom, #1e293b 1px, transparent 1px)`,
                    backgroundSize: '80px 80px',
                    backgroundPosition: '-1px -1px'
                }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020617_80%)]" />
        </div>
    );
}