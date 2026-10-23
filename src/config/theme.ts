import { ThemeConfig } from "antd";

export const getThemeConfig = (): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#5b4bd8",
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
};
