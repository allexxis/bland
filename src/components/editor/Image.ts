class EditorImage {
   private data: {
      url: string;
      caption: string;
   };
   private wrapper: HTMLDivElement;

   constructor({ data }: { data: any }) {
      console.log(data);
      this.data = data;
      this.wrapper = document.createElement('div');
   }
   static get toolbox() {
      return {
         title: 'Image',
         icon: '<svg width="17" height="15" viewBox="0 0 336 276" xmlns="http://www.w3.org/2000/svg"><path d="M291 150V79c0-19-15-34-34-34H79c-19 0-34 15-34 34v42l67-44 81 72 56-29 42 30zm0 52l-43-30-56 30-81-67-66 39v23c0 19 15 34 34 34h178c17 0 31-13 34-29zM79 0h178c44 0 79 35 79 79v118c0 44-35 79-79 79H79c-44 0-79-35-79-79V79C0 35 35 0 79 0z"/></svg>',
      };
   }

   render() {
      this.wrapper = document.createElement('div');
      const input = document.createElement('input');

      this.wrapper.classList.add('simple-image');
      this.wrapper.appendChild(input);

      input.placeholder = 'Paste an image URL...';
      if (this.data && this.data.url) {
         input.value = this.data && this.data.url ? this.data.url : '';
         this._createImage(this.data.url, this.data.caption);
      }
      input.value = this.data && this.data.url ? this.data.url : '';

      input.addEventListener('paste', (event) => {
         if (event.clipboardData) {
            this._createImage(
               event.clipboardData.getData('text'),
               ' Write a caption...'
            );
         }
      });
      return this.wrapper;
   }
   _createImage(url: string, captionText: string) {
      const image = document.createElement('img');
      image.className = 'max-w-full mb-4';
      const caption = document.createElement('div');
      caption.className =
         'w-[300px] p-4 border border-gray-300 rounded-md outline-none font-mono text-sm';
      image.src = url;
      (caption as any).contentEditable = true;
      caption.innerHTML = captionText || '';

      this.wrapper.innerHTML = '';
      this.wrapper.appendChild(image);
      this.wrapper.appendChild(caption);
   }
   save(blockContent: any) {
      const image = blockContent.querySelector('img');
      const caption = blockContent.querySelector('[contenteditable]');

      return {
         url: image.src,
         caption: caption.innerHTML || '',
      };
   }
}
export default EditorImage;
