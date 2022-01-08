import { Scrollbars } from "react-custom-scrollbars";

const ScrollBar = () => {
  return (
    <div>
      <div style={{ maxHeight: "300px", width: "300px" }}>
        <Scrollbars
          autoHide
          autoHideTimeout={200}
          autoHideDuration={200}
          style={{ width: "250px", height: "250px" }}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            libero leo, ultricies sit amet euismod non, pretium in velit.
            Vestibulum congue lorem tellus. Pellentesque feugiat tellus lorem,
            sed ultricies massa molestie et. Vestibulum vestibulum enim eros,
            vel rhoncus nisi rhoncus sed. Nulla at convallis ex. Nulla interdum
            arcu vel bibendum interdum. Etiam finibus et massa eu cursus.
            Maecenas odio tellus, sollicitudin quis purus in, tincidunt
            fermentum purus. Maecenas varius justo ac lacus vulputate, bibendum
            rhoncus metus efficitur. Praesent quam nibh, auctor vel dui nec,
            tempor semper leo. Integer quis pharetra nunc. Praesent mattis
            feugiat mi vel vulputate. Donec aliquam placerat dui at convallis.
            Donec facilisis vehicula justo et molestie. Suspendisse vel commodo
            sapien. Nunc ornare aliquam risus a vestibulum. Nam malesuada risus
            at vulputate cursus. Vestibulum eros elit, bibendum at augue a,
            congue pharetra nisl. Vestibulum rhoncus tortor nisi, tempus aliquam
            lectus tincidunt sed. Suspendisse scelerisque fermentum sagittis.
            Pellentesque efficitur, felis sit amet mollis auctor, dui magna
            vulputate dolor, a aliquet nulla ante ut velit. Pellentesque
            consequat vehicula ultricies. Mauris ut hendrerit ante, quis lacinia
            enim. Maecenas imperdiet erat eu sapien tincidunt, ut consequat erat
            lobortis. Vestibulum elementum, metus id tincidunt viverra, elit
            elit mattis massa, eu dapibus dolor tellus in dolor. Maecenas
            volutpat dolor non magna dapibus varius. Sed at semper sapien, at
            efficitur urna. Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia curae; Curabitur pretium a erat sit amet
            consectetur. Aliquam congue iaculis magna, tristique blandit dolor
            suscipit vulputate. Sed porttitor velit mollis, maximus tellus
            cursus, sagittis metus. Integer porta lorem eu sem luctus rhoncus.
            Sed nec sem ligula. Nulla in enim sit amet sapien venenatis molestie
            non vel orci. Vestibulum est orci, cursus ac justo vitae, maximus
            gravida urna. Integer vitae feugiat tellus. Suspendisse nunc justo,
            ullamcorper tristique sodales ut, hendrerit eu ante. Nunc ut mollis
            lectus. Duis id suscipit neque. Morbi ac elit tempus, elementum
            massa ac, pellentesque orci. Morbi turpis velit, finibus commodo
            convallis non, posuere in mauris. Etiam maximus, odio nec aliquam
            commodo, odio nulla fermentum purus, eu eleifend ante ligula ac
            metus. Nunc posuere sollicitudin porta. Suspendisse faucibus, eros a
            gravida bibendum, lacus diam luctus velit, vel elementum nunc est eu
            turpis. Aenean vitae porttitor risus, nec ultrices neque. Nulla
            tempor faucibus elit vel feugiat. Aliquam erat volutpat. Nullam
            mattis at tellus in pretium. Etiam euismod, magna at commodo
            volutpat, ante eros pellentesque odio, egestas bibendum ante lacus
            nec orci. Integer sem sem, mattis nec lacinia sed, dapibus nec
            turpis. Nulla vel urna et magna commodo elementum vestibulum eget
            metus. Nullam scelerisque nibh suscipit, tincidunt risus vitae,
            iaculis leo. Nullam facilisis volutpat leo.
          </p>
        </Scrollbars>
      </div>
    </div>
  );
};

export default ScrollBar;
