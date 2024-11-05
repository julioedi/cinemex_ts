interface LoadingProps {
    fullpage?: boolean
}

export default function (props: LoadingProps) {
    if (props.fullpage) {
        return (
            <div className="loading_wrap">
                <div id="loading">
                    <i className="mso loading_icon">progress_activity</i>
                </div>
            </div>
        );
    }
    return (
        <div id="loading">
            <i className="mso loading_icon">progress_activity</i>
        </div>
    );
}