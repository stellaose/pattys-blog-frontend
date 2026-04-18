import { ThemeConfig } from "antd";

export const getThemeConfig = (): ThemeConfig | undefined => {
  return {
    token: {
      colorPrimary: "#c5d86d",
      borderRadius: 5,
      colorBorder: "#f9fafc",
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
    },
  };
};
