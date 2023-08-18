import { Routes, Route, Outlet, Link } from "react-router-dom";
import { Home, Person } from "./pages";
import { NoData } from "@semcore/ui/widget-empty";
import { Box, Flex } from "@semcore/ui/flex-box";
import { ThemeProvider } from "@semcore/utils/lib/ThemeProvider";
import Button from "@semcore/ui/button";
import { useCallback, useEffect, useState } from "react";
import PauseL from "@semcore/icon/Pause/l";
import ChevronRightL from "@semcore/icon/ChevronRight/l";
import TimeNightL from "@semcore/icon/TimeNight/l";
import TimeDayL from "@semcore/icon/TimeDay/l";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="person/:id" element={<Person />} />
        <Route path="*" element={<NoMatch />} />
      </Route>
    </Routes>
  );
}

const lightTheme = {
  "--bg-main": "white",
  "--intergalactic-bg-primary-neutral": "#ffffff",
  "--intergalactic-bg-primary-neutral-hover": "#f4f5f9",
  "--intergalactic-bg-primary-neutral-active": "#e0e1e9",
  "--intergalactic-bg-primary-info": "#008ff8",
  "--intergalactic-bg-primary-success": "#009f81",
  "--intergalactic-text-primary": "#191b23",
  "-intergalactic-text-secondary": "#6c6e79",
  "--intergalactic-text-link": "#006dca",
  "--intergalactic-box-shadow-card":
    "0px 0px 1px 0px rgba(25, 27, 35, 0.16), 0px 1px 2px 0px rgba(25, 27, 35, 0.12)",
  "--intergalactic-overlay-limitation-secondary": "rgba(255, 255, 255, 0.85)",
};

const darkTheme = {
  "--bg-main": "black",
  "--intergalactic-bg-primary-neutral": "rgba(30, 34, 49, 1)",
  "--intergalactic-bg-primary-neutral-hover": "rgba(54, 56, 67, 1)",
  "--intergalactic-bg-primary-neutral-active": "rgba(54, 56, 67, 1)",
  "--intergalactic-bg-primary-info": "#008ff8",
  "--intergalactic-bg-primary-success": "#009f81",
  "--intergalactic-text-primary": "#f4f5f9",
  "--intergalactic-text-secondary": "#a9abb6",
  "--intergalactic-text-link": "#8ecdff",
  "--intergalactic-box-shadow-card":
    "0px 0px 1px 0px rgba(255, 255, 255, 0.66), 0px 1px 2px 0px rgba(255, 255, 255, 0.12)",
  "--intergalactic-overlay-limitation-secondary": "rgba(54, 56, 67, 0.85)",
};

function Layout() {
  const [songRef, setSongRef] = useState<HTMLAudioElement | null>(null);
  const [isPlayAudio, setIsPlayAudio] = useState(true);
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    setSongRef(document.getElementById("song") as HTMLAudioElement);
  }, []);
  const handleChangeAudio = useCallback(() => {
    isPlayAudio ? songRef?.pause() : songRef?.play();
    setIsPlayAudio(!isPlayAudio);
  }, [isPlayAudio, songRef]);

  const handleChangeTheme = useCallback(() => {
    setIsDark(!isDark);
  }, [isDark]);

  return (
    <ThemeProvider tokens={isDark ? darkTheme : lightTheme}>
      <Flex
        tag="header"
        px="2%"
        py={2}
        justifyContent="right"
        style={{ backgroundColor: "var(--bg-main)" }}
      >
        <Button onClick={handleChangeTheme} use="tertiary">
          {isDark ? <TimeDayL /> : <TimeNightL />}
        </Button>

        <Button onClick={handleChangeAudio} use="tertiary">
          {isPlayAudio ? <PauseL /> : <ChevronRightL />}
        </Button>
      </Flex>
      <div style={{ backgroundColor: "var(--bg-main)" }}>
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

function NoMatch() {
  return (
    <NoData
      h="100vh"
      type="nothing-found"
      description="Try changing your filters."
    >
      <Box mt={4}>
        <Link to="/">Go to the home page</Link>
      </Box>
    </NoData>
  );
}
