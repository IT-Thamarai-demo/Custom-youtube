document.addEventListener("DOMContentLoaded", function() {
    const videoUrlInput = document.getElementById("videoUrl");
    const addVideoButton = document.getElementById("addVideo");
    const playlistElement = document.getElementById("playlist");

    function updatePlaylist() {

        chrome.storage.local.get(["playlist"], function(result) {
            playlistElement.innerHTML = "";
            (result.playlist || []).forEach(video => {
                const li = document.createElement("li");
                li.textContent = video;
                playlistElement.appendChild(li);
            });
        });
    }
    

    addVideoButton.addEventListener("click", function() {
        const videoUrl = videoUrlInput.value.trim();
        if (!videoUrl) return;

        chrome.storage.local.get(["playlist"], function(result) {
            const playlist = result.playlist || [];
            playlist.push(videoUrl);
            chrome.storage.local.set({ playlist }, updatePlaylist);
        });
    });

    updatePlaylist();
});
