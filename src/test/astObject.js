const ast = [
  {
    type: 1,
    tag: "template",
    ns: 0,
    tagType: 0,
    props: [],
    children: [
      {
        type: 3,
        content: " 标准文本节点 ",
        loc: {
          start: {
            column: 3,
            line: 2,
            offset: 13,
          },
          end: {
            column: 18,
            line: 2,
            offset: 28,
          },
          source: "<!-- 标准文本节点 -->",
        },
      }, {
        type: 1,
        tag: "p",
        ns: 0,
        tagType: 0,
        props: [
          {
            type: 7,
            name: "bind",
            rawName: ":class",
            exp: {
              type: 4,
              loc: {
                start: {
                  column: 14,
                  line: 3,
                  offset: 42,
                },
                end: {
                  column: 42,
                  line: 3,
                  offset: 70,
                },
                source: "{ highlight: isHighlighted }",
              },
              content: "{ highlight: isHighlighted }",
              isStatic: false,
              constType: 0,
            },
            arg: {
              type: 4,
              loc: {
                start: {
                  column: 7,
                  line: 3,
                  offset: 35,
                },
                end: {
                  column: 12,
                  line: 3,
                  offset: 40,
                },
                source: "class",
              },
              content: "class",
              isStatic: true,
              constType: 3,
            },
            modifiers: [],
            loc: {
              start: {
                column: 6,
                line: 3,
                offset: 34,
              },
              end: {
                column: 43,
                line: 3,
                offset: 71,
              },
              source: ":class=\"{ highlight: isHighlighted }\"",
            },
          },
          {
            type: 7,
            name: "bind",
            rawName: ":style",
            exp: {
              type: 4,
              loc: {
                start: {
                  column: 52,
                  line: 3,
                  offset: 80,
                },
                end: {
                  column: 72,
                  line: 3,
                  offset: 100,
                },
                source: "{ color: textColor }",
              },
              content: "{ color: textColor }",
              isStatic: false,
              constType: 0,
            },
            arg: {
              type: 4,
              loc: {
                start: {
                  column: 45,
                  line: 3,
                  offset: 73,
                },
                end: {
                  column: 50,
                  line: 3,
                  offset: 78,
                },
                source: "style",
              },
              content: "style",
              isStatic: true,
              constType: 3,
            },
            modifiers: [],
            loc: {
              start: {
                column: 44,
                line: 3,
                offset: 72,
              },
              end: {
                column: 73,
                line: 3,
                offset: 101,
              },
              source: ":style=\"{ color: textColor }\"",
            },
          }
        ],
        children: [
          {
            type: 2,
            content: "动态样式和类名",
            loc: {
              start: {
                column: 74,
                line: 3,
                offset: 102,
              },
              end: {
                column: 81,
                line: 3,
                offset: 109,
              },
              source: "动态样式和类名",
            },
          }
        ],
        loc: {
          start: {
            column: 3,
            line: 3,
            offset: 31,
          },
          end: {
            column: 85,
            line: 3,
            offset: 113,
          },
          source: "<p :class=\"{ highlight: isHighlighted }\" :style=\"{ color: textColor }\">动态样式和类名</p>",
        },
        codegenNode: undefined,
      }
    ],
    loc: {
      start: {
        column: 1,
        line: 1,
        offset: 0,
      },
      end: {
        column: 12,
        line: 4,
        offset: 125,
      },
      source: "<template>\n  <!-- 标准文本节点 -->\n  <p :class=\"{ highlight: isHighlighted }\" :style=\"{ color: textColor }\">动态样式和类名</p>\n</template>",
    },
    codegenNode: undefined,
  }
]