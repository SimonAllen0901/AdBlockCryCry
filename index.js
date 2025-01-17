class AdBlockCryCry {
  constructor() {}

  init(callback) {
    const dataContainer = document.createElement("div");
    dataContainer.innerHTML = this.generatesHTMLString();
    document.body.append(dataContainer);
    callback();
  }

  detect() {}

  generatesHTMLString() {
    return `
      <div id="ads"></div>
    `;
  }

  checkVisibilityHidden() {
    const element = document.querySelector(`#ads`);
    if (!element) return true;
  }

  checkBlockedResource() {
    return new Promise((resolve) => {
      const fakeAd = document.createElement("img");
      fakeAd.src = `/ads.jpg`;
      fakeAd.onerror = () => resolve(true);
      fakeAd.onload = () => resolve(false);
      document.body.appendChild(fakeAd);
    });
  }

  checkBlockedRequests() {
    return new Promise((resolve) => {
      const randomPath = `/ads.js`;
      fetch(randomPath)
        .then(() => resolve(false))
        .catch(() => resolve(true));
    });
  }
}
export default AdBlockCryCry;
