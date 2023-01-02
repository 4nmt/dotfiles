import fs from "fs";
import { KarabinerRules } from "./types";
import { createHyperSubLayers, app, open } from "./utils";

const rules: KarabinerRules[] = [
  // Define the Hyper key itself
  {
    description: "Hyper Key (⌃⌥⇧⌘)",
    manipulators: [
      {
        description: "Caps Lock -> Hyper Key",
        from: {
          key_code: "caps_lock",
          modifiers: {
            optional: ["any"],
          },
        },
        to: [
          {
            key_code: "left_shift",
            modifiers: ["left_command", "left_control", "left_option"],
          },
        ],
        type: "basic",
      },
    ],
  },
  ...createHyperSubLayers({
    // Navigation: hjkl work like they do in vim
    h: {
      to: [{ key_code: "left_arrow" }],
    },
    j: {
      to: [{ key_code: "down_arrow" }],
    },
    k: {
      to: [{ key_code: "up_arrow" }],
    },
    l: {
      to: [{ key_code: "right_arrow" }],
    },

    // Selection
    s: {
      to: [
        {
          key_code: "left_shift",
          modifiers: [
            "left_shift",
            "left_control",
            "left_option",
            "left_command",
          ],
        },
      ],
    },

    // Deletion
    n: {
      to: [{ key_code: "delete_or_backspace", modifiers: ["left_option"] }],
    },
    m: {
      to: [{ key_code: "delete_or_backspace" }],
    },
    comma: {
      to: [{ key_code: "delete_or_backspace", modifiers: ["fn"] }],
    },
    period: {
      to: [{ key_code: "delete_forward", modifiers: ["left_option"] }],
    },

    // o = "Open" applications
    o: {
      c: app("Google Chrome 2"),
      v: app("Visual Studio Code"),
      n: app("Notion"),
      b: app("Obsidian"),
      t: app("iTerm"),
      p: app("Spotify"),
      a: app("Alfred 4"),
    },

    // 3 = Digital keyboard
    3: {
      n: { to: [{ key_code: "0" }] },
      m: { to: [{ key_code: "1" }] },
      comma: { to: [{ key_code: "2" }] },
      period: { to: [{ key_code: "3" }] },
      j: { to: [{ key_code: "4" }] },
      k: { to: [{ key_code: "5" }] },
      l: { to: [{ key_code: "6" }] },
      u: { to: [{ key_code: "7" }] },
      i: { to: [{ key_code: "8" }] },
      o: { to: [{ key_code: "9" }] },
    },

    // w = "Window" via rectangle.app
    w: {
      g: {
        description: "Window: Hide",
        to: [
          {
            key_code: "h",
            modifiers: ["right_command"],
          },
        ],
      },
      u: {
        description: "Window: Left",
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["right_option", "right_control"],
          },
        ],
      },
      p: {
        description: "Window: Right",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_option", "right_control"],
          },
        ],
      },
      j: {
        description: "Window: Previous Window",
        to: [
          {
            key_code: "left_arrow",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      k: {
        description: "Window: Next Window",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["right_option", "right_command"],
          },
        ],
      },
      h: {
        description: "Window: Previous Tab",
        to: [
          {
            key_code: "h",
            modifiers: ["left_command"],
          },
        ],
      },
      l: {
        description: "Window: Next Tab",
        to: [
          {
            key_code: "l",
            modifiers: ["left_command"],
          },
        ],
      },
      f: {
        description: "Window: Full Screen",
        to: [
          {
            key_code: "backslash",
            modifiers: ["right_option", "right_control"],
          },
        ],
      },
      i: {
        description: "Window: Full Screen",
        to: [
          {
            key_code: "backslash",
            modifiers: ["right_option", "right_control"],
          },
        ],
      },
      o: {
        description: "Window: Next Screen",
        to: [
          {
            key_code: "right_arrow",
            modifiers: ["left_control", "left_option", "left_command"],
          },
        ],
      },
      // Note: No literal connection. Both f and n are already taken.
      m: {
        description: "Window: Forward",
        to: [
          {
            key_code: "close_bracket",
            modifiers: ["right_control"],
          },
        ],
      },
    },

    // Misc
    // Convenient way to hit control keystroke
    d: {
      to: [
        {
          key_code: "left_option",
          modifiers: [
            "left_shift",
            "left_control",
            "left_option",
            "left_command",
          ],
        },
      ],
    },
    q: {
      to: [{ key_code: "left_control" }],
    },
    a: {
      to: [
        {
          key_code: "left_shift",
          modifiers: ["left_option", "left_command"],
        },
      ],
    },
    open_bracket: {
      to: [{ key_code: "escape" }],
    },

    // c = Musi*c* which isn't "m" because we want it to be on the left hand
    c: {
      p: {
        to: [{ key_code: "play_or_pause" }],
      },
      n: {
        to: [{ key_code: "fastforward" }],
      },
      b: {
        to: [{ key_code: "rewind" }],
      },
    },
  }),
];

fs.writeFileSync(
  "karabiner.json",
  JSON.stringify(
    {
      global: {
        show_in_menu_bar: false,
      },
      profiles: [
        {
          name: "Default",
          complex_modifications: {
            rules,
          },
        },
      ],
    },
    null,
    2
  )
);
