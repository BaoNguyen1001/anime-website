import styled from "styled-components";

function DefaultRangeInput(props) {
  const { value } = props;
  return (
    <Container>
      <div>
        <p for="customRange3" class="form-label">Rating from</p>
        <Wrapper>
          <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" style={{height: "20px"}}/>
          <p>1</p>
        </Wrapper>
      </div>
      <div>
        <p for="customRange3" class="form-label">Rating from</p>
        <Wrapper>
          <input type="range" class="form-range" min="0" max="5" step="1" id="customRange3" style={{height: "20px"}}/>
          <p>2</p>
        </Wrapper>
      </div>
    </Container>

  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  p {
    margin: 0 0 16px 0;
  }
`

const Wrapper = styled.div`
  background: rgba(255,255,255,0.07);
  display: grid;
  grid-gap: 10px;
  grid-template-columns: auto 13px;
  padding: 10px 10px;
  border-radius: 6px;
  align-items: center;
  justify-content: center;
`



export default DefaultRangeInput;