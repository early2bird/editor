- 划分段落样式，段落上有样式
- 文字上有行内样式

- html可以表示富文本数据结构(有歧义性)
- 自定义数据结构(如何自定义)
  - 三层结构（树结构，文档是根节点，段落是子节点，文本是叶子节点）
  - 文档表示整个文档
  - 段落，表示以回车分割段落
  - 段落中的文本片段 Segment


```javascript
const document = {
  type: 'document',
  nodes: [
    {
      type: 'paragraph',
      text: 'this.i s a palai,text',
      style: { // 段落样式作用在整个段落上 ，与css的取值保持一致
        textAlign: "center"
      }
    },
    {
      type: 'paragraph',
      segments: [ // 行内样式是作用一个或者多个字符上,样式相同的属于一个片段
        {
          text: 'abc', style: {fontWeight: 'bold'},
        },
        {
          text: 'f'
        },
        {
          text: 'def', style: {fontWeight: 'normal'},
        }
      ],
      style: {
        textAlign: "center"
      }
    }
  ]
}

```

