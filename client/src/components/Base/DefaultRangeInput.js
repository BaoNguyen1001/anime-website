import styled from "styled-components";

export function DefaultRangeInput(props) {
  const { min, max, filterName, onChange, label, value } = props;

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    onChange({
      target: {
        filterName,
        name,
        value,
      }
    })
  }

  return (
    <Container>
      <div>
        <p className="form-label">{label} from</p>
        <Wrapper>
          <input
            type="range"
            className="form-range"
            min={min}
            max={max}
            step="1"
            name="minValue"
            style={{height: "20px"}}
            onChange={handleOnChange}
            value={value?.minValue}
          />
          <span className="min-value">{value?.minValue}</span>
        </Wrapper>
      </div>
      <div>
        <p className="form-label">{label} to</p>
        <Wrapper>
          <input
            type="range"
            className="form-range"
            min={min}
            max={max}
            step="1"
            name="maxValue"
            style={{height: "20px"}}
            onChange={handleOnChange}
            value={value?.maxValue}
          />
          <span className="max-value">{value?.maxValue}</span>
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
