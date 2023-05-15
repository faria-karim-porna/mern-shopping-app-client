class BrowserWindowUtil {
  public static GetHeightUptoBottom(id: string): string {
    const elem: HTMLElement | null = document.getElementById(id);
    const height = window.innerHeight - (elem?.getBoundingClientRect().top ?? 0);
    return height + "px";
  }
}

export const Utility = {
  BrowserWindowUtil,
};
