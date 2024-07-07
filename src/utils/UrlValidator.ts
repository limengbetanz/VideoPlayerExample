//
//  UrlValidator.ts
//  VideoPlayerExample
//
//  Created by Terry Li on 07/07/2024.
//

class UrlValidator {
  static isValidUrl(url: string): boolean {
    const urlPattern = new RegExp(
      '^(https?:\\/\\/)' + // protocol
        '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
        '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
        '(\\:\\d+)?' + // port
        '(\\/[-a-z\\d%@_.~+&:]*)*' + // path
        '(\\?[;&a-z\\d%@_.,~+&:=-]*)?' + // query string
        '(\\#[-a-z\\d_]*)?$',
      'i', // fragment locator
    );

    try {
      new URL(url);
      return urlPattern.test(url);
    } catch (e) {
      return false;
    }
  }
}

export default UrlValidator;
