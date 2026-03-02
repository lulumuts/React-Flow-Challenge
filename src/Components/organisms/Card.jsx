import IconButton from '@mui/material/IconButton';
import MuiCard from '@mui/material/Card';
import { Handle, Position } from '@xyflow/react';
import { UserIcon, InfoCircleIcon } from '../atoms/ProfileHeaderIcons';
import AddIcon from '@mui/icons-material/Add';
import InputSelectField from '../molecules/InputSelectField';
import ValueFieldWithPicker from '../molecules/ValueFieldWithPicker';
import { useCardForm } from '../../hooks/useCardForm';

export default function CardForm({ id }) {
  const {
    selectedField,
    value,
    setValue,
    selectOptions,
    fieldType,
    fieldOptions,
    optionsLoader,
    hasFieldSelected,
    editable,
    handleFieldChange,
    handleAddNode
  } = useCardForm(id);

  return (
    <div className="card-form">
      <div className="card-form__container">
        <Handle type="target" position={Position.Left} />
        <Handle type="source" position={Position.Left} id="a" />

        <MuiCard className="card-form__paper">
          <div className="card-form__header card-drag-handle">
            <span className="card-form__header-icon">
              <UserIcon size={16} />
            </span>
            <h6 className="card-form__header-title">Update Profile Field</h6>
            <IconButton
              size="small"
              aria-label="More info"
              disableFocusRipple
              className="card-form__header-info-btn"
            >
              <InfoCircleIcon size={20} />
            </IconButton>
          </div>

          <div className="card-form__content nodrag">
            <InputSelectField
              value={selectedField}
              onChange={handleFieldChange}
              options={selectOptions}
            />
            <ValueFieldWithPicker
              label="Value"
              fieldType={fieldType}
              fieldOptions={fieldOptions}
              optionsLoader={optionsLoader}
              value={value}
              onValueChange={setValue}
              editable={hasFieldSelected && editable}
              disabled={!hasFieldSelected}
            />
          </div>
        </MuiCard>
      </div>

      <IconButton
        className="card-form__add-btn nodrag"
        onClick={handleAddNode}
        aria-label="Add node"
        size="small"
      >
        <AddIcon />
      </IconButton>
    </div>
  );
}
