import { ThemeConfig } from "antd";

export const getThemeConfig = (): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#c5d86d",
      borderRadius: 5,
      colorBorder: "#dedde2",
    },
    components: {
      Input: {
        fontFamily: "Epilogue",
      },
      Select: {
        fontFamily: "Epilogue",
      },

      Table: {
        fontFamily: "Epilogue",
      },
      Button: {
        fontFamily: "Epilogue",
      },
      Form: {
        fontFamily: "Epilogue",
      },
      Dropdown: {
        controlItemBgActive: "#DBE1C1",
        controlItemBgHover: "#DBE1C1",
        
      },
    },
  };
}
