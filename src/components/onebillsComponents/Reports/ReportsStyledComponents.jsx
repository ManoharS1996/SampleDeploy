import styled, { keyframes, css } from "styled-components";
import BootstrapDropdown from "react-bootstrap/Dropdown";

// TITLE DROPDOWN STYLES 

const fadeIn = keyframes`
    from {
        opacity: 0;
        transform: translateY(-10px); /* Move the dropdown up initially */
    }
    to {
        opacity: 1;
        transform: translateY(0); /* Move the dropdown down */
    }
`

const slideIn = keyframes` //animation source
    from {
        opacity: 0;
        transform: translateX(-10px); /* Move the sub-menu to the left initially */
    }
    to {
        opacity: 1;
        transform: translateX(0); /* Move the sub-menu to its original position */
    }
`

const rotation = keyframes`
    
        from {
            transform: rotate(0deg);
        }
        to {
            transform: rotate(360deg);
        }
    
`

export const ActionsContainer = styled.div`
    display: flex;
    align-items: center;
`;

export const AllText = styled.h1`
    font-size: 15px;
    margin: 5px;
    padding: 0;
    text-align: left;
`;

export const AndBtn = styled.button`
    height: fit-content;
    width: fit-content;
    outline: none;
    border: none;
    border-right: 1px solid #ccc;
    background-color: #fff;
    color: #000;
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
    
    background: ${({ condition }) => condition === 'and' ? '#007200' : 'inherit'};
    color: ${({ condition }) => condition === 'and' ? 'white' : 'inherit'};
    border-radius: ${({ condition }) => condition === 'and' ? '50px' : '0px'};
    
`;

export const AndOrBtnClose = styled.button`
    height: 30px;
    width: 30px;
    outline: none;
    border: 1px solid #ccc;
    background-color: #fff;
    color: red;
    padding: 0px;
    margin-left: 5px;
    border-radius: 50%;
`;

export const BackBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    border-radius: 8px;
    border: none;
    color: #000;
    cursor: pointer;

    &:hover {
        outline: none;
        border: none;
    }
`;

export const ConfigureButton = styled.button`
    text-align: center;
    display: flex;
    align-items: center;
    height: 30px;
    outline: none;
    border: 1px solid #6c757d;
    padding: 5px;
    margin-right: 5px;
    margin-left: 5px;
    background-color: #FFFFFF;
    color: #353535;
    outline: none;
`;

export const CustomContainer = styled.div`
    width: fit-content;
    flex-grow: 1;
    height: 93vh;
    overflow-y: auto;
    padding: 10px;
    background-color: #e5e5e5;
`;

export const CustomViewContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`;

export const MultiLevelDropdownContainer = styled.div`
    position: relative;
    display: inline-block;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: row;
    height: 100%;
    width: fit-content;
`;

export const DropdownMenu = styled.ul`
    list-style: none;
    padding: 0;
    margin: 1px;
    position: absolute;
    top: 100%;
    left: 0;
    display: none;
    background-color: #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    z-index: 1;
    width: 200px;
    border-radius: 3px;
    opacity: 0;
    animation: ${fadeIn} 0.3s ease-in-out;

    ${MultiLevelDropdownContainer}:hover & {
        display: block;
        opacity: 1;
    }
`;

export const DropdownToggle = styled.div`
    cursor: pointer;
    height: fit-content;
    width: fit-content;
    font-size: 22px;
    font-weight: bold;
`;

export const FilterBtn = styled.button`
    height: 30px;
    width: 30px;
    padding: 0;
    outline: none;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
    margin-right: 10px;
    border-radius: 5px;
    border: none;
    cursor: pointer;
    color: #000;

    &:hover {
        outline: none;
        border: none;
        background-color: #e9ecef;
    }
`;

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px 10px 10px 6px;
`;

export const FormContent = styled.div`
    border-radius: 15px;
    padding: 15px;
    background-color: #ffffff;
    min-height: 100%;
`;

export const HeaderContainer = styled.div`
    height: fit-content;
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 2px 2px 2px 0px ;
    border-radius: 5px;
`;

export const MenuItem = styled.li`
    display: flex;
    padding: 6px 10px 6px;
    align-items: center;
    color: #000;
    &:hover {
        background-color: #f0f0f0;
    }

    .plus {
        margin: 0;
        padding: 0;
        position: absolute;
        right: 10px;
    }
`;

export const ActionButtonConditions = styled.div`
    width: fit-content;
    margin: 0;
    padding: 0;
    display: flex;
    align-items: center;
    gap: 5px;
`

export const OrBtn = styled(AndBtn)`
    
    border-radius: ${({ condition }) => condition === 'or' ? '50px' : '0px'};
    background: ${({ condition }) => condition === 'or' ? '#007200' : 'inherit'};
    color: ${({ condition }) => condition === 'or' ? 'white' : 'inherit'};
    
`;

export const RemoveConditionBtn = styled.button`
     display: flex;
    align-items: center;
    justify-content: center;
    height: fit-content;
    background-color: #fff;
    color: #000;
    padding: 0px;
    text-align: center;
    border-radius: 50px;
    border: none;
    outline: none;
    
    &:hover {
        color: red;
    }
`

export const AddConditionBtn = styled(OrBtn)`
    border: 2px dashed #ccc;
    border-radius: 100px;
    padding: 15px 20px;
`

export const PTag = styled.p`
    margin: 0px;
    width: fit-content;
    margin-left: 4px;
`

export const SearchInput = styled.input`
    height: 30px;
    border-radius: 8px;
    outline: none;
    border: 1px solid #6c757d;
    padding: 5px;
    margin-left: 3px;
    margin-right: 3px;
    background-color: #fff;
    color: #000;
`;

export const SideNavNContentContainer = styled.div`
    width: 100vw;
    height: 93vh;
    background-color: #e5e5e5;
    display: flex;
    margin-top: 7vh;
`;

export const StyledDropDown = styled(BootstrapDropdown)`
    height: 30px;
    min-width: 140px;
    max-width: fit-content;
    background-color: #fff;
    border-radius: 5px;
    border: 1px solid #ccc;
`;

export const StyledItem = styled(BootstrapDropdown.Item)`
    border-radius: 3px;
    &:hover {
        background-color: #e8e8e4;
    }
`;

export const StyledMenu = styled(BootstrapDropdown.Menu)`
    width: 100%;
    min-height: fit-content;
    overflow-y: auto;
    max-height: 200px;
    padding: 3px;
    background-color: #fff;

    &::-webkit-scrollbar{
        width: 2px;
    }
    &::-webkit-scrollbar-track{
        background: transparent;
    }
`;

export const StyledToggle = styled(BootstrapDropdown.Toggle)`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border: none;
`;

export const SubMenu = styled.ul`
    position: absolute;
    top: 0;
    left: 100%;
    display: none;
    min-width: 100px;
    z-index: 1;
    width: 150px;
    background-color: #fff;
    margin: 2px;
    list-style-type: none;
    padding-left: 0px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    opacity: 0;
    animation: ${slideIn} 0.3s ease-in-out;

    ${MenuItem}:hover & {
        display: block;
        opacity: 1;
    }
`;

export const SubMenuItem = styled.li`
    padding: 5px;
    &:hover {
        background-color: #f0f0f0;
    }
`;

export const TitleContainer = styled.div`
    display: flex;
    align-items: center;
    border-radius: 10px;
`;


// reports view selection components
export const SelectReportViewContainer = styled.div`
    width: 100%; 
    max-height: 100%;
    /* margin-top: 7vh; */
    display: flex;
    flex-direction: column;
    padding: 1%;
    background-color: #fff;
    border-radius: 15px;
    /* align-items: center;
    justify-content: center; */
`

export const ReportViewsContainer = styled.div`
    width: 100%; 
    height: 100%;
    display: grid;
    grid-template-columns: 24% 24% 24% 24%;
    margin: 0;
    padding: 1%;
    gap: 15px;
    overflow: auto;
`

export const ViewCard = styled.div`
    width: 100%;
    height: 200px;
    padding: 10px;
    border-radius: 10px;
    box-shadow: 0px 0px 4px 1px #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: larger;
    font-weight: bold;
    cursor: pointer;
    
    &:hover {
        box-shadow: 0px 0px 10px 1px #00A9FF;
    }
`

export const CardImg = styled.img`
    max-width: 90%;
    max-height: 100%;
`

export const BackIconAndTitleContainer = styled.div`
    width: 100%;
    margin: 0;
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: x-large;
`


// generate reports components

export const MainContainer = styled.div`
    width: 100vw;
    height: 100vh; 
    display: flex;
    /* flex-direction: column; */
    
`

export const ContentContainer = styled.div`
    height: 100vh;
    width: 85vw;
    background: #F4F7FE;
    padding: 0 1%;
`

export const BodyDiv = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    /* padding: 0.8rem 1rem 1rem 1rem; */
`

export const FieldContainer = styled.div`
    width: 100%; 
    /* flex-grow: 1; */
    height: fit-content;
    display: flex;
    align-items: center;
    /* justify-content: center; */
    gap: 20px;
`

export const FilterFieldContainer = styled(FieldContainer)`
    gap: 10px;
`

export const ReportFormContainer = styled.div` 
    flex-grow: 1;
    height: 92%;
    padding: 1%;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    gap: 1%;
    border-radius: 15px;
`

export const GeneratereportsHeader = styled.div`
    padding: 0px ;
    display: flex;
    align-items: center;
    gap: 15px;
`

export const CreateBtn = styled.button`
    outline: none;
    cursor: pointer;
    padding: 10px 20px;
    margin-left: auto;
    background-color: #caf0f8;
    color: #03045e;
    border-radius: 50px;
    
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-weight: 700;
    border: none;
    height: fit-content;
    transition: transform 0.5s ease;
    
    svg {
        left: 0;
        transition: transform 0.5s ease;
        transform: translateX(0);
    }
    
    &:hover svg {
        transform: translateX(10px);
    }
`

export const GenerateReportsBodySection = styled.div`
    width: 100%;
    height: 100%;
    /* flex-grow: 1; */
    display: flex;
    align-items: center;
    gap: 0%; 
    padding: 0%;
    overflow: auto;
`

export const ReportForm = styled.form`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    gap: 25px;
    width: ${({ width }) => width ? width : 'fit-content'};
    /* box-shadow: 0px 0px 10px 2px #ccc; */
    height: 100%;
    padding: 2% ;
    border-radius: 10px;
    overflow: auto;
`

export const ReportFieldLabel = styled.label`
    width: 20%;
    font-size: 12px;
    text-align: right;
    font-weight: 600;
    text-transform: capitalize;
    display: flex;
    justify-content: flex-end;
`

export const ReportFieldInput = styled.input`
    width: fit-content;
    flex-grow: 1;
    padding: 10px 15px;
    border: none;
    border: 1px solid #ccc;
    border-radius: 50px;
    outline: none;
    text-transform: capitalize;
    
    &:focus{
        border: 1px solid #007bff;
    }
`

export const PreviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center; 
    gap: 15px;
    width: ${({ width }) => width ? width : 'fit-content'};
    /* box-shadow: 0px 0px 10px 2px #ccc; */
    height: 100%;
    padding: 15px;
    border-radius: 10px;
    overflow: auto;
`

export const TableContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const CharContainer = styled.div`
    width: 100%;
    min-height: 50%;
    flex-grow: 1;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const FiltersContainer = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    align-items: center;
    /* justify-content: space-around; */
    gap: 8px;
    margin: 0 0 10px 0;
`

export const CustomLabel = styled.label`
     width: fit-content;
    font-size: 12px;
    text-align: right;
    font-weight: 600;
    text-transform: capitalize;
    display: flex;
    justify-content: flex-end;
`


export const UpdatePreviewBtn = styled.button`
    display: flex;
    width: ${({ isLoading }) => isLoading ? '120px' : '32px'};
    align-items: center;
    justify-content: space-between;
    height: fit-content;
    background-color: #fff;
    color: #000;
    padding: 5px;
    padding-right: ${({ isLoading }) => isLoading ? '10px' : 'inherit'};
    text-align: center;
    border-radius: 50px;
    border: 1px solid #ccc;
    transition: width 7;
    gap: 8px;
    
    svg {
        animation: ${({ isLoading }) =>
        isLoading
            ? css`${rotation} 2s infinite linear`
            : 'none'};
    }
`;