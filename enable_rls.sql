-- Enable RLS on user_credits table
ALTER TABLE public.user_credits ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own credits
CREATE POLICY "Users can view their own credits" ON public.user_credits
FOR SELECT USING (auth.uid() = user_id);

-- Create policy to allow users to update their own credits
CREATE POLICY "Users can update their own credits" ON public.user_credits
FOR UPDATE USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own credits
CREATE POLICY "Users can insert their own credits" ON public.user_credits
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Enable RLS on user_credits_audit table
ALTER TABLE public.user_credits_audit ENABLE ROW LEVEL SECURITY;

-- Create policy to allow users to view their own audit records
CREATE POLICY "Users can view their own audit" ON public.user_credits_audit
FOR SELECT USING (auth.uid() = user_id);

-- Note: Assuming the tables have a 'user_id' column that matches auth.uid()
-- If the column name is different, replace 'user_id' with the correct column name