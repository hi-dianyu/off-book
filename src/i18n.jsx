import { createContext, useContext, useState, useCallback } from "react";

const strings = {
  appTitle:        { en: "Off-Book",                    zh: "脱稿" },
  placeholder:     { en: "Invite code",                 zh: "邀请码" },
  enter:           { en: "Enter",                       zh: "进入" },
  invalidCode:     { en: "Invalid code",                zh: "邀请码不正确" },
  exampleHint:     { en: 'Enter "example" to try',      zh: '输入 "example" 试用' },
  selectPlay:      { en: "Select a play",               zh: "选择剧本" },
  importPlay:      { en: "Import new play",             zh: "导入新剧本" },
  close:           { en: "Close",                       zh: "关闭" },
  contact:         { en: "Contact",                     zh: "联系" },
  back:            { en: "← Back",                      zh: "← 返回" },
  selectCharacter: { en: "Select a character",          zh: "选择角色" },
  jumpToScene:     { en: "Jump to scene",               zh: "跳转场次" },
  clickToReveal:   { en: "Click to reveal line",        zh: "点击显示台词" },
};

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState("en");
  const t = useCallback((key) => strings[key]?.[lang] ?? key, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
