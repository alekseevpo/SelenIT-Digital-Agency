import { render, screen } from '@testing-library/react';
import { describe, it } from '@jest/globals';
import { FormField, FormInput, FormSelect, FormTextarea } from '@/components/ui/FormFields';
import '@/__tests__/types';

describe('FormFields Components', () => {
    it('FormField renders correctly', () => {
        render(
            <FormField label="Test Label" required={true} error="">
                <input data-testid="test-input" />
            </FormField>,
        );

        expect(screen.getByText('Test Label')).toBeInTheDocument();
        expect(screen.getByText('*')).toBeInTheDocument();
        expect(screen.getByTestId('test-input')).toBeInTheDocument();
    });

    it('FormField shows error message', () => {
        render(
            <FormField label="Test Label" error="Test error">
                <input data-testid="test-input" />
            </FormField>,
        );

        expect(screen.getByText('Test error')).toBeInTheDocument();
        expect(screen.getByTestId('test-input')).toBeInTheDocument();
    });

    it('FormInput renders with correct props', () => {
        render(<FormInput id="test-input" type="text" placeholder="Test placeholder" />);

        const input = screen.getByTestId('form-input');
        expect(input).toHaveAttribute('id', 'test-input');
        expect(input).toHaveAttribute('type', 'text');
        expect(input).toHaveAttribute('placeholder', 'Test placeholder');
    });

    it('FormInput shows error state', () => {
        render(<FormInput error={true} />);

        const input = screen.getByTestId('form-input');
        expect(input).toBeInTheDocument();
    });

    it('FormSelect renders with options', () => {
        render(
            <FormSelect>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
            </FormSelect>,
        );

        const select = screen.getByTestId('form-select');
        expect(select).toBeInTheDocument();
        expect(screen.getByText('Option 1')).toBeInTheDocument();
        expect(screen.getByText('Option 2')).toBeInTheDocument();
    });

    it('FormTextarea renders with correct props', () => {
        render(<FormTextarea rows={5} placeholder="Test placeholder" />);

        const textarea = screen.getByTestId('form-textarea');
        expect(textarea).toHaveAttribute('rows', '5');
        expect(textarea).toHaveAttribute('placeholder', 'Test placeholder');
    });
});
